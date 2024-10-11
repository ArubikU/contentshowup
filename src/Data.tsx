
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
export const mockPack: Pack[] = [
    {
      name: "ExampleMod",
      repository: "https://github.com/example/examplemod",
      description: "This is an example mod that showcases various features of Ignite.",
      loader: "ignite",
      versions: [
        {
          version: "1.20.4",
          file: {
            type: "LINK",
            raw: "https://example.com/examplemod-1.20.4.jar"
          }
        },
        {
          version: "1.20.2",
          file: {
            type: "LINK",
            raw: "https://example.com/examplemod-1.20.2.jar"
          }
        },
        {
          version: "1.19.4",
          file: {
            type: "LINK",
            raw: "https://example.com/examplemod-1.19.4.jar"
          }
        }
      ],
      author: "https://github.com/exampleauthor",
      tags: ["vanilla", "1.20.1", "optimization"]
    },
    {
      name: "AnotherMod",
      repository: "https://github.com/example/anothermod",
      description: "This is another example mod with different features.",
      loader: "ignite",
      versions: [
        {
          version: "1.20.4",
          file: {
            type: "LINK",
            raw: "https://example.com/anothermod-1.20.4.jar"
          }
        }
      ],
      author: "https://github.com/anotherauthor",
      tags: ["1.20.4", "gameplay", "adventure"]
    }
  ]