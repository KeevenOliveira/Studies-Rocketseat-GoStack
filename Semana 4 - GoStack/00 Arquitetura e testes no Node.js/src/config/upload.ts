import multer from 'multer';
import path from 'path';
import crypto from 'crypto'; 

const tempFolder = path.resolve(__dirname, '..', '..', 'temp');

export default{

    tmpFolder: tempFolder,
    uploadFolder: path.resolve(tempFolder, 'uploads'),
    
    storage: multer.diskStorage({
        destination: tempFolder,
        filename(request, file, callback){
            const fileHash = crypto.randomBytes(10).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        }
    }),
}