/* eslint-disable array-callback-return */
import { getCustomRepository, getRepository, In } from 'typeorm';

import csvParse from 'csv-parse';
import fs from 'fs';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';

// eslint-disable-next-line prettier/prettier
interface CSVTransaction {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class ImportTransactionsService {
  async execute(filePath: string): Promise<Transaction[]> {
    const transactionRepository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getRepository(Category);
    const contactsReadStream = fs.createReadStream(filePath);

    const parsers = csvParse({
      from_line: 2,
    });

    const parseCSV = contactsReadStream.pipe(parsers);

    const transactions: CSVTransaction[] = [];
    const categories: string[] = [];

    parseCSV.on('data', async line => {
      // eslint-disable-next-line prettier/prettier
      const [title, type, value, category] = line.map((cell: string) =>
        cell.trim(),
      );
      if (!title || !type || !value) return;

      categories.push(category);

      transactions.push({
        title,
        type,
        value,
        category,
      });
    });

    await new Promise(resolve => parseCSV.on('end', resolve));

    const existentCategories = await categoriesRepository.find({
      where: {
        title: In(categories),
      },
    });
    const existentCategoriesTitles = existentCategories.map(
      // eslint-disable-next-line prettier/prettier
      (category: Category) => category.title);

    // eslint-disable-next-line prettier/prettier
    const addCategoryTitles = categories.filter(
      category => !existentCategoriesTitles.includes(
        category)).filter((value, index, self) => self.indexOf(value) === index);

    const newCategories = categoriesRepository.create(
      addCategoryTitles.map(title => ({
        title,
      })),
    );

    await categoriesRepository.save(newCategories);

    const finalCategories = [...newCategories, ...existentCategories];

    const createdTransactions = transactionRepository.create(
      transactions.map(transaction => ({
        title: transaction.title,
        type: transaction.type,
        value: transaction.value,
        category: finalCategories.find(
          category => category.title === transaction.category,
        ),
      })),
    );
    await transactionRepository.save(createdTransactions);

    await fs.promises.unlink(filePath);

    return createdTransactions;
  }
}

export default ImportTransactionsService;
