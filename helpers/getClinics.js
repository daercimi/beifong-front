export const getClinics = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BEIFONG_API_URL}/api/clinics`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.log(error)
  }
}
