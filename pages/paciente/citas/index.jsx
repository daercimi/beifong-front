import { useEffect, useState } from "react"
import { appointmentHeaders } from "utils/constants"
import TableData from "components/TableData"

export default function MyAppointments({ updateTooltip }) {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    const getAppointmentsByUser = async () => {
      const token = JSON.parse(window.localStorage.getItem("token"))
      const patient = JSON.parse(window.localStorage.getItem("patient"))
      /**
       * FIXME: Las llamadas a endpoints deberian estar centralizadas en servicios de acuerdo al recurso
       * (en este caso las citas), de otra forma es muy complicado de mantener. Por ejemplo cuando el backend
       * modifique el method, alguna palabra de la ruta o los headers se tendría que buscar todos los
       * componentes que usen tal endpoint, pero si tenemos esto centralizado en un servicio simplemente 
       * tenemos que acceder al servicio y hacer la modificacion correspondiente en ese único lugar.
       */
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BEIFONG_API_URL}/api/clinicalAppointments/${patient.patientId}/patient`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const { clinicalAppointments } = await response.json()
      console.log(clinicalAppointments)
      setAppointments(clinicalAppointments)
    }
    getAppointmentsByUser()
  }, [])

  return (
    appointments.length > 0 && (
      <TableData
        updateTooltip={updateTooltip}
        type="Citas"
        data={appointments}
        gridTemplateHeader="grid-cols-7"
        headerType={appointmentHeaders}
      />
    )
  )
}
