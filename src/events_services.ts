export const getAvailableSlots = async (payload: { eventMonth: string }) => {
  return await fetch(
    "https://asia-south1-genlent-8aab7.cloudfunctions.net/skillRazrEvents-api/getAllEvents",
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
};

/* usage 
    eventMonth is a date string in ISO format e.g '2023-06-01T00:00:00.000Z' to get that you can use new Date() 
    
    const data = await getEvents({eventMonth: new Date('2023/06/01 00:00:00 UTC').toISOString()});
*/
