import IStorageProvider from "../models/IStorageProvider";
import fs from 'fs';
import path from 'path';
import uploadConfig from '../../../../../config/upload';

class DiskStorageProvider implements IStorageProvider {
    public async saveFile(file: string): Promise<string>{
        await fs.promises.rename(
            path.resolve(uploadConfig.tmpFolder, file),
            path.resolve(uploadConfig.uploadFolder, file),
        )
        return file;
    }
    public async deleteFile(file: string): Promise<void>{
        const filePath = path.resolve(uploadConfig.uploadFolder, file);

        try {
            await fs.promises.stat(filePath);
        } catch (error) {
            return;
        }
        await fs.promises.unlink(filePath);
    }
}
export default DiskStorageProvider;