import { Request, Response } from 'express';
import { acquisitAppData } from '../services/dataAcquisitionService';

export const triggerDataAcquisition = async (req: Request, res: Response) => {
  try {
    await acquisitAppData();
    res.status(200).json({ msg: 'Data Acquisition Done' });;
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

