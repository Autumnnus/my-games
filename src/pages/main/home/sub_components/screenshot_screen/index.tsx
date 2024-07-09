import { HomeScreenLayout } from "@pages/main/home/sub_components/layout"
export function ScreenshotScreen({ image }: { image: string }) {
  return (
    <HomeScreenLayout
      image={image}
      heading="Ekran görüntülerinizi saklayın"
      body="Steam dışında bir oyun oynayıp ekran görüntülerinizi saklamakta sıkıntı mı çekiyorsunuz? Artık bu projede ekran görüntülerinizi her oyun için saklayabilirsiniz."
      imagePosition="left"
    />
  )
}
