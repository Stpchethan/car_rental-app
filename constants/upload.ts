import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from '';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), '/public/uploads'); // Save in /public/uploads

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req, (err: any, fields: any, files: { file: any; }) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'File upload failed' });
      }

      const file = files.file as formidable.File;
      const filePath = file.filepath;  // Get the file path
      const fileUrl = `/uploads/${path.basename(filePath)}`; // URL to access the file in the public folder

      return res.status(200).json({ imageUrl: fileUrl });
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
