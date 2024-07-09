import { HomeScreenLayout } from "@pages/main/home/sub_components/layout"

export function DataTableScreen({ image }: { image: string }) {
  return (
    <HomeScreenLayout
      image={image}
      heading="Oyunlarınızın Verilerini Tutun"
      body="Oynadığınız tüm oyunlar hakkında detaylıca veri tutabilir ve tuttuğunuz verileri tablo halinde görebilir ve sıralayabilirsiniz."
      imagePosition="right"
    />
  )
}
