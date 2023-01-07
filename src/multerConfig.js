
import multer from 'multer'
// const path = require('path');
const storage = multer.diskStorage({
   
});

const upload  = multer({storage:storage})


export default upload