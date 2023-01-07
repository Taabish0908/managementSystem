
import mv from 'mv';
import fs from 'fs';
class UploadService {
    async uploadFile(req, folderName, fileName) {
       
        console.log(req.file);
        const temp_path = req.file.path;

        //getting the current working directory and replacing it with regex
        let CurrentDirectoryPath =process.cwd().replace(/\\/g, '/');
        console.log(CurrentDirectoryPath);
      
        
        const folderPath = CurrentDirectoryPath + '/src/uploads/' + folderName;
        let target_path = folderPath + '/' + fileName;
        
        fs.access(folderPath, function (error) {
            if (error) {
                fs.mkdir(folderPath, (error) => console.log(error));
                console.log("Directory was not exist. Thus created");
                target_path = folderPath + '/' + fileName;
            }

            // console.log("Current directory:", CurrentDirectoryPath);
            mv(temp_path, target_path, function (err) {
                console.log('file uploaded')
                if (err) {
                    console.log('Error in uploding file', err);
                    return err;
                }
            });
            // if(typeof req.file && req.file.originalname === 'undefined') req.file.originalname = ''
            
        });
        // CurrentDirectoryPath =`${process.env.HOST}${process.env.PORT}`;
                target_path = folderPath + '/' + fileName;
        return CurrentDirectoryPath +'/uploads/' + folderName +'/'+ fileName;
    }

}
export default new UploadService();