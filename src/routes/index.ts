import { Router } from "express";
import { getRuleBasedCharges, getRuleBasedChargesForLocation, getVendorsFromRouting } from "../utils/utils";

const router = Router();

const CHUNK_SIZE = 5;
const chunkData = (data: any, chunkSize: number) => {
  const chunks = [];
  const dataValues = Object.values(data);

  for (let i = 0; i < dataValues.length; i += chunkSize) {
    const chunk = dataValues.slice(i, i + chunkSize);
    chunks.push(chunk);
  }

  return chunks;
};

router.post("/chargeTemplates", async (req, res) => {
  try {
    const { driverOrder } = req?.body?.loadInfo;

    const chunks = chunkData(driverOrder, CHUNK_SIZE); // Split large dictionary into smaller chunks
    const results = [];
    
    // Process each chunk
    for (const chunk of chunks) {
      let additionalInfo: any = req?.body?.additionalInfo;
      additionalInfo.vendorList = getVendorsFromRouting(chunk, "driver");
      const fetchMultiRulesChargesFromProfileGroup: any = await getRuleBasedCharges(
        chunk,
        additionalInfo,
      );

      const fetchedMultiLocationCharges: any = await getRuleBasedChargesForLocation(
        chunk,
        additionalInfo,
      );

      results.push(...fetchMultiRulesChargesFromProfileGroup, ...fetchedMultiLocationCharges);
    }

    return res.json({ data: results, hello: "hi" });

  } catch (error: any) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: error?.message });
  }
});

export default router;
