import { Router } from "express";
import { getRuleBasedCharges, getRuleBasedChargesForLocation, getVendorsFromRouting } from "../utils/utils";

const router = Router();

const CHUNK_SIZE = 5;

function* processData(data: any, chunkSize: number) {
  const dataValues = Object.values(data);

  for (let i = 0; i < dataValues.length; i += chunkSize) {
    yield dataValues.slice(i, i + chunkSize); // Yield chunk of data
  }
}

router.post("/chargeTemplates", async (req, res) => {
  try {
    const { driverOrder } = req?.body?.loadInfo;
    const results = [];
    
    const dataGenerator = processData(driverOrder, CHUNK_SIZE);
    let orders = dataGenerator.next()
    
    while (!orders.done) {
      const chunk = orders.value;
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
      orders = dataGenerator.next();  // Request another set of customer order
    }   
    return res.json({ data: results });
  } catch (error: any) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: error?.message });
  }
});

export default router;
