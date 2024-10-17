import { Dispatch, SetStateAction } from "react"

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
    shortDesc: string
  }

//get all files from the https://github.com/ArubikU/contentshowup/tree/main/public/packs
//the files are in format xxxx-xxxx-xxxx-xxxx.json
//starting from 0000-0000-0000-0000.json to 9999-9999-9999-9999.json
//example 0000-0000-0000-0001.json 0000-0000-0000-0002.json  etc
//each file contains a json object with the pack data
export const GetPackData = async (
  minRequest = 0, 
  maxRequests = 100, 
  update: Dispatch<SetStateAction<Pack[]>>, 
  currentResults: Pack[] = [],
  onEnd 
) => {
  update(currentResults);
  onEnd()
  if (minRequest >= maxRequests) {
    // Si hemos llegado al límite, actualizamos con los resultados obtenidos
    //force a render
    return;
  }

  const packNumber = minRequest.toString().padStart(16, "0").match(/.{1,4}/g).join("-");

  try {
    const res = await fetch(`https://raw.githubusercontent.com/ArubikU/contentshowup/main/public/packs/${packNumber}.json`);

    if (res.status === 200) {
      const data = await res.json();
      currentResults.push(data); // Agrega los resultados obtenidos al array
    } else {
      //console.warn(`Pack ${packNumber} not found (status: ${res.status})`);
      // Detenemos la recursión si no se encuentra el archivo
      return update(currentResults);
    }
  } catch (error) {
    //console.error(`Error fetching pack ${packNumber}:`, error);
    // Detenemos la recursión si hay un error
    return update(currentResults);
  }

  // Llamamos de nuevo a la función recursivamente con el siguiente pack
  await GetPackData(minRequest + 1, maxRequests, update, currentResults,onEnd);
};
