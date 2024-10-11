
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
export let mockPack: Pack[];

//get all files from the https://github.com/ArubikU/contentshowup/tree/main/public/packs
//the files are in format xxxx-xxxx-xxxx-xxxx.json
//starting from 0000-0000-0000-0000.json to 9999-9999-9999-9999.json
//each file contains a json object with the pack data
export const GetPackData = async () => {
    const packData = [];
    for (let i = 0; i < 10000; i++) {
        const response = await fetch(`https://raw.githubusercontent.com/ArubikU/contentshowup/main/public/packs/${i.toString().padStart(4, '0')}-${i.toString().padStart(4, '0')}-${i.toString().padStart(4, '0')}-${i.toString().padStart(4, '0')}.json`);
        if (response.ok) {
            const data = await response.json();
            packData.push(data);
        }else{
            break;
        }
    }
    mockPack = packData;
    return packData;
}