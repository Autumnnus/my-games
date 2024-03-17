import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState
} from "react"

import useToggle from "@hooks/use_toggle"
import i18next from "@utils/localization"
import { GamesData } from "types/games"

import {
  AppContextProps,
  appContextDefaultValues,
  useAppContext
} from "../app_context"

export type GamesContextProps = {
  games?: GamesData[]
  setGames?: Dispatch<SetStateAction<GamesData[]>>
  isAddGameDialogOpen?: boolean
  setIsAddGameDialogOpen?: () => void
  isEditGameDialogOpen?: boolean
  setIsEditGameDialogOpen?: () => void
  isDeleteGameDialogOpen?: boolean
  setIsDeleteGameDialogOpen?: () => void
}

export type GamesPageContextProps = AppContextProps & GamesContextProps

export const gamesPageDefaultValues: GamesPageContextProps = {
  ...appContextDefaultValues,
  translate: i18next.t
}

const GamesPageContext = createContext(gamesPageDefaultValues)

export function GamesPageContextProvider(props: {
  children: React.ReactNode | React.ReactNode[]
}) {
  const { translate } = useAppContext()

  const [isAddGameDialogOpen, setIsAddGameDialogOpen] = useToggle()
  const [isEditGameDialogOpen, setIsEditGameDialogOpen] = useToggle()
  const [isDeleteGameDialogOpen, setIsDeleteGameDialogOpen] = useToggle()
  const [games, setGames] = useState([
    {
      gameScore: 7.4,
      gameTotalTime: 10,
      gameStatus: "Bitirildi",
      gameDate: "2024-03-10",
      gamePhoto:
        "https://image.api.playstation.com/vulcan/ap/rnd/202106/2216/uFqCClqXSIsEFIo3ktJdZm7H.png",
      createdAt: {
        seconds: 1709844598,
        nanoseconds: 265000000
      },
      gamePlatform: "Epic Games",
      screenshots: [
        {
          id: "kr87nhaqlthpj5re",
          ssName: "",
          ssUrl: "https://i.imgur.com/Vy4SACx.png"
        },
        {
          ssUrl: "https://i.imgur.com/toKHOjY.png",
          ssName: "",
          id: "d2jljd9llthpja7g"
        },
        {
          ssName: "",
          id: "5m30chuzlthpjd8n",
          ssUrl: "https://i.imgur.com/774s8Z6.png"
        },
        {
          ssUrl: "https://i.imgur.com/5agV7rt.png",
          ssName: "",
          id: "owy21p7flthpjhxh"
        },
        {
          ssName: "",
          id: "yn982t8clthpjm2f",
          ssUrl: "https://i.imgur.com/Vgj5yqO.png"
        },
        {
          ssName: "",
          ssUrl: "https://i.imgur.com/vdRiIow.png",
          id: "rsifhy6xlthpjpwe"
        },
        {
          ssUrl: "https://i.imgur.com/Jj1rFT8.png",
          ssName: "",
          id: "wd970sutlthpjsz2"
        },
        {
          ssUrl: "https://i.imgur.com/1zrtdVg.png",
          ssName: "",
          id: "attvsa8llthpjwcx"
        },
        {
          id: "fknjxrnmltlwogut",
          ssName: "",
          ssUrl: "https://i.imgur.com/TR8C0Zf.png"
        },
        {
          ssUrl: "https://i.imgur.com/ODURHCW.png",
          id: "2388iq9bltlwoqkw",
          ssName: ""
        },
        {
          ssName: "",
          id: "86jdbxholtlwp5es",
          ssUrl: "https://i.imgur.com/KQRGL0s.png"
        },
        {
          id: "bm8uooewltlwple7",
          ssUrl: "https://i.imgur.com/ANOC5RC.png",
          ssName: ""
        },
        {
          id: "ju3mnmpxltlwpxcq",
          ssUrl: "https://i.imgur.com/c32DfgE.png",
          ssName: ""
        },
        {
          id: "6jfrp0ifltlwq3gw",
          ssName: "",
          ssUrl: "https://i.imgur.com/TZNn4qd.png"
        },
        {
          ssName: "",
          ssUrl: "https://i.imgur.com/T2sIvRF.png",
          id: "6kunjtplltlwq9qw"
        },
        {
          ssUrl: "https://i.imgur.com/zHP874o.png",
          id: "c6etbv5yltlwqg89",
          ssName: ""
        },
        {
          id: "6q4jdg8ultlwqni5",
          ssName: "",
          ssUrl: "https://i.imgur.com/t2rjS64.png"
        },
        {
          id: "otj7x26wltlwqz5g",
          ssUrl: "https://i.imgur.com/jQOSn3F.png",
          ssName: ""
        },
        {
          ssUrl: "https://i.imgur.com/0IGkqlX.png",
          id: "6j99ge6qltlwr5jf",
          ssName: ""
        },
        {
          id: "xql4pzpoltlwrbrx",
          ssName: "",
          ssUrl: "https://i.imgur.com/aWxJug7.png"
        }
      ],
      gameName: "A Plague Tale: Innocence",
      gameReview:
        "Orta çağ Fransasını tema alan ve farelerden oluşan karanlık bir vebayı konu olan bu oyun, oynanılış mekaniği çok iyi olmasa da hikayesi ve atmosferi çok başarılı",
      userId: "TalXJ5g1FSZYyfMwg0wasE7vokg1",
      id: "bI8LqE8DF2GMDNEsoHeY"
    },
    {
      createdAt: {
        seconds: 1709412155,
        nanoseconds: 473000000
      },
      gameScore: 8.6,
      gameName: "Batman: Arkham Knight",
      gameTotalTime: 18,
      gamePhoto:
        "https://image.api.playstation.com/cdn/UP1018/CUSA00133_00/due3Vp0T2VSGfBtGsWjVnrL4o882iYVk.png",
      screenshots: [
        {
          ssName: "",
          id: "8d9avot5ltajx1qt",
          ssUrl:
            "https://steamuserimages-a.akamaihd.net/ugc/2437081273419775386/C3B84A6857E234BBA31E97FDBB1A36103DF7D102/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
        },
        {
          ssName: "",
          id: "hpv0z6exltajx9vq",
          ssUrl:
            "https://steamuserimages-a.akamaihd.net/ugc/2437081273419777021/DB317379E3E7D7392E425A71FEC9285C8CFF0D68/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
        },
        {
          ssName: "",
          id: "ov7ai5v0ltajxffd",
          ssUrl:
            "https://steamuserimages-a.akamaihd.net/ugc/2437081273419778908/F647E1384E93E9CDE3216E699CC0791B96BA1E34/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
        },
        {
          id: "ukri0j3iltajxkxj",
          ssUrl:
            "https://steamuserimages-a.akamaihd.net/ugc/2437081273420041058/13E2EDE0A7D8B2B3EB25215243DBCE44B1FCB73F/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
          ssName: ""
        },
        {
          id: "sdhcw5fnltc0w8mj",
          ssName: "",
          ssUrl:
            "https://steamuserimages-a.akamaihd.net/ugc/2437081273426473724/3C104F1BB37F767B1CD711840AC599BC0B5E7D85/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
        },
        {
          ssUrl:
            "https://steamuserimages-a.akamaihd.net/ugc/2437081273426474736/5D9FD924770408A64D4493141AFB76BC13B898FC/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
          id: "51vhwddoltc0wdyw",
          ssName: ""
        },
        {
          ssName: "",
          ssUrl:
            "https://steamuserimages-a.akamaihd.net/ugc/2437081273426475641/E833F5D32AA9BC306D285A0D4CDCCD3592570CB2/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
          id: "qt1bz2xsltc0wigw"
        },
        {
          ssName: "",
          id: "emsqr2h7ltc0wn97",
          ssUrl:
            "https://steamuserimages-a.akamaihd.net/ugc/2437081273426477537/15AB8CFBE3A97B283365C662B41803747CEC0A0E/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
        },
        {
          ssUrl:
            "https://steamuserimages-a.akamaihd.net/ugc/2437081273426496115/3E4C6133820112B740207DA9EDC7F235F00D93BE/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
          id: "67wmf9lhltc0wwuf",
          ssName: "🦇 🤡"
        },
        {
          id: "ppwicfdhltfdxpjq",
          ssName: "",
          ssUrl:
            "https://steamuserimages-a.akamaihd.net/ugc/2437081273437686560/F59A220CA062B53A220388478E6835BB6CEB0CB9/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
        },
        {
          ssName: "",
          id: "jqtxfaf2ltfdxv4v",
          ssUrl:
            "https://steamuserimages-a.akamaihd.net/ugc/2437081273437687093/0F5E835C940BE7405AAC2DE9093E2D24B0FB4FAF/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
        },
        {
          ssUrl:
            "https://steamuserimages-a.akamaihd.net/ugc/2437081273437687556/53ED2B4233BBDDE55BC865ECAD74DC66808E0ABE/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
          id: "yncpncorltfdy01c",
          ssName: ""
        },
        {
          ssUrl:
            "https://steamuserimages-a.akamaihd.net/ugc/2426948806789085104/05EDA93757ECA2B6F1EA52C29A2B5BB7F8D88ABE/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
          id: "0j9grs18ltg7rncc",
          ssName: ""
        },
        {
          ssUrl:
            "https://steamuserimages-a.akamaihd.net/ugc/2426948806789085835/BCA3636BCDEB5BC32774931D3AD95C2E58F19B37/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
          ssName: "",
          id: "3wkns50eltg7rvge"
        },
        {
          ssName: "",
          id: "ocdlvdv6ltg7s0se",
          ssUrl:
            "https://steamuserimages-a.akamaihd.net/ugc/2426948806789086501/08151058B6A9A3C85C6484D96504BBC2B4C3F22E/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
        }
      ],
      gameDate: "2024-03-06",
      gamePlatform: "Steam",
      userId: "TalXJ5g1FSZYyfMwg0wasE7vokg1",
      gameReview:
        "Önceki Batman oyunlara göre çok başarılı bir oyun. Hikayesi harika, mekanikleri harika, açık dünyası güzel. Önceki oyunlarda beklediğim çoğu eksiklikleri fazlasıyla tamamladı. Karakter gelişimi çok güzel renk katmış. Ölmeden önce oynanılması gereken oyunlardan",
      gameStatus: "Bitirildi",
      id: "LKSMpNl709rZRJX9LgRR"
    },
    {
      gameDate: "2024-03-02",
      createdAt: {
        seconds: 1709153901,
        nanoseconds: 264000000
      },
      userId: "TalXJ5g1FSZYyfMwg0wasE7vokg1",
      gamePlatform: "Diğer Platformlar",
      gameName: "The Last of Us Part I",
      gameTotalTime: 13.1,
      gameScore: 9.4,
      screenshots: [
        {
          ssUrl: "https://i.imgur.com/gmut2QN.png",
          ssName: "",
          id: "le3uxp0tltacsnyr"
        },
        {
          ssName: "",
          ssUrl: "https://i.imgur.com/T2EjnMg.png",
          id: "v7xqkoa8ltacsrku"
        },
        {
          id: "tyity1pjltacsujl",
          ssUrl: "https://i.imgur.com/NiY217w.png",
          ssName: ""
        },
        {
          id: "h6db2el7ltacsxgj",
          ssName: "",
          ssUrl: "https://i.imgur.com/FUNjqeT.png"
        },
        {
          id: "qmzk6krhltact0q9",
          ssName: "",
          ssUrl: "https://i.imgur.com/iiyV50p.png"
        },
        {
          id: "c46e7njjltact4s0",
          ssName: "",
          ssUrl: "https://i.imgur.com/rikHe03.png"
        }
      ],
      gameStatus: "Bitirildi",
      gamePhoto:
        "https://image.api.playstation.com/vulcan/ap/rnd/202206/0720/eEczyEMDd2BLa3dtkGJVE9Id.png",
      gameReview:
        "Film tadında efsane ötesi oyun. Oyun hikayesi harika, mekanikleri harika, Türkçe dublaj olması harika. Oyun övgü üzerine övgü hak ediyor fakat tek bir sıkıntı var o da oyunda yaşadığım bug'lardı. O da büyük bir sıkıntı değildi.",
      id: "hQZPEnki79lygN6qqgZ2"
    }
  ])

  return (
    <GamesPageContext.Provider
      value={{
        ...gamesPageDefaultValues,
        translate,
        games,
        setGames,
        isAddGameDialogOpen,
        setIsAddGameDialogOpen,
        isEditGameDialogOpen,
        setIsEditGameDialogOpen,
        isDeleteGameDialogOpen,
        setIsDeleteGameDialogOpen
      }}
    >
      {props.children}
    </GamesPageContext.Provider>
  )
}

export function useGamesPageContext() {
  const context = useContext(GamesPageContext)
  if (context === undefined) {
    throw new Error("GamesPage Context Error")
  }
  return context
}
