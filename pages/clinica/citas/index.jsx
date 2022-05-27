import { useEffect, useState } from "react"
import { appointmentClinicHeaders } from "utils/constants"
import TableData from "components/TableData"

export default function AllAppointments({ updateTooltip }) {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    const getAppointmentsByUser = async () => {
      const token = JSON.parse(window.localStorage.getItem("token"))
      const clinic = JSON.parse(window.localStorage.getItem("clinic"))
      /**
       * FIXME: Las llamadas a endpoints deberian estar centralizadas en servicios de acuerdo al recurso
       * (en este caso las citas), de otra forma es muy complicado de mantener. Por ejemplo cuando el backend
       * modifique el method, alguna palabra de la ruta o los headers se tendría que buscar todos los
       * componentes que usen tal endpoint, pero si tenemos esto centralizado en un servicio simplemente 
       * tenemos que acceder al servicio y hacer la modificacion correspondiente en ese único lugar.
       */
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BEIFONG_API_URL}/api/clinics/${clinic.clinicId}?clinicalAppointments=true`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const {
        clinic: { clinicalAppointments },
      } = await response.json()
      console.log(clinicalAppointments)
      setAppointments(clinicalAppointments)
    }
    getAppointmentsByUser()
  }, [])

  return (
    appointments.length > 0 && (
      <TableData
        updateTooltip={updateTooltip}
        type="Citas de clínica"
        data={appointments}
        gridTemplateHeader="grid-cols-5"
        headerType={appointmentClinicHeaders}
      />
    )
  )
}
