
export type Pack = {
    name: string
    repository: string
    description: string
    versions: {
      version: string
      file: {
        type: "URI" | "LINK"
        raw: string
        extra?: string
      }
    }[]
    author: string
    logo?: string
    banner?: string
    tags: string[]
    loader?: string
  }

//get all files from the https://github.com/ArubikU/contentshowup/tree/main/public/packs
//the files are in format xxxx-xxxx-xxxx-xxxx.json
//starting from 0000-0000-0000-0000.json to 9999-9999-9999-9999.json
//example 0000-0000-0000-0001.json 0000-0000-0000-0002.json  etc
//each file contains a json object with the pack data
export const GetPackData = async (minRequest= 0 ,maxRequests= 100) => {
  const requests = [];

  for (let i = minRequest; i < maxRequests; i++) {
      const packNumber = i.toString().padStart(16, "0").match(/.{1,4}/g).join("-");
      const request = fetch(`https://raw.githubusercontent.com/ArubikU/contentshowup/main/public/packs/${packNumber}.json`)
          .then(res => (res.status === 200 ? res.json() : null))
          .catch(error => console.error(`Error fetching pack ${packNumber}:`, error));
      requests.push(request);
  }

  const packData = (await Promise.all(requests)).filter(Boolean); // Filtra valores nulos
  return packData;
};
