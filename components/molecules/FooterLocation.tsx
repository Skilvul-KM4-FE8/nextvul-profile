import React from 'react'

const FooterLocation = () => {

  const footerLocations = [
    {
      name: "Jakarta",
      address: "Jl. Cihampelas No. 123, Jakarta",
      phone: "+62 22 1234 5678",
      email: "nextvul.service@gmail.com"
    },
    {
      name: "Jakarta",
      address: "Jl. Boulevard Raya Blok QA5 No. 1, Kelapa Gading, Jakarta Utara",
      phone: "+62 21 1234 5678",
      email: "alfito@gmail.com"
    },
    {
      name: "Pematang Siantar",
      address: "Jl. Raya Darmo Permai III No. 12, Siantar",
      phone: "+62 31 1234 5678",
      email: "rafaimhd123@gmail.com"
    },
    {
      name: "Medan",
      address: "Jl. Raya Darmo Permai III No. 12, Medan",
      phone: "+62 31 1234 5678",
      email: "nabila123@gmail.com"
    },
  ]

  return (
    <div className='w-10/12 md:max-w-5xl px-4 mx-auto flex gap-7 items-start flex-col md:flex-row justify-start md:justify-center py-10 border-t border-t-slate-500'>
      {footerLocations.map((item, index) => (
        <>
          <div key={index} className='flex flex-wrap w-4/5 flex-col gap-2 md:gap-5 md:mb-5'>
            <p className='text-lg font-semibold text-slate-300'>{item.name}</p>
            <p className='text-sm font-thin text-slate-300'>{item.address}</p>
            <p className='text-sm font-thin text-slate-300'>{item.phone}</p>
            <p className='text-sm font-thin text-slate-300'>{item.email}</p>
          </div>
        </>
      ))}
    </div>
  )
}

export default FooterLocation