import React from 'react'
import Image from 'next/image'
import './TopMajorComponent.scss'

type Props = {}

const TopMajorComponent = (props: Props) => {
  return (
    <div className='flex justify-center w-full'>
      <div className='py-10 max-w-6xl w-full'>
        <h1 className='font-bold text-2xl mb-8'>Top 10 ngành hàng đầu</h1>
        <ul className='inline-flex flex-wrap justify-center -mx-6'>
            <li className='w-[250px] h-[250px]  bg-red-500 rounded-lg flex flex-col items-center justify-center item-major'>
                <Image src={'/majors/iconBusiness.svg'} className='w-32' width={200} height={200} alt='Kinh doanh'/>
                <h2 className='font-bold'>Kinh doanh</h2>
                <p>12.800 việc làm</p>
            </li>
            <li className='w-[250px] h-[250px]  bg-red-500 rounded-lg flex flex-col items-center justify-center item-major'>
                <Image src={'/majors/iconBusiness.svg'} className='w-32' width={200} height={200} alt='Kinh doanh'/>
                <h2 className='font-bold'>Kinh doanh</h2>
                <p>12.800 việc làm</p>
            </li>
            <li className='w-[250px] h-[250px]  bg-red-500 rounded-lg flex flex-col items-center justify-center item-major'>
                <Image src={'/majors/iconBusiness.svg'} className='w-32' width={200} height={200} alt='Kinh doanh'/>
                <h2 className='font-bold'>Kinh doanh</h2>
                <p>12.800 việc làm</p>
            </li>
            <li className='w-[250px] h-[250px]  bg-red-500 rounded-lg flex flex-col items-center justify-center item-major'>
                <Image src={'/majors/iconBusiness.svg'} className='w-32' width={200} height={200} alt='Kinh doanh'/>
                <h2 className='font-bold'>Kinh doanh</h2>
                <p>12.800 việc làm</p>
            </li>
            <li className='w-[250px] h-[250px]  bg-red-500 rounded-lg flex flex-col items-center justify-center item-major'>
                <Image src={'/majors/iconBusiness.svg'} className='w-32' width={200} height={200} alt='Kinh doanh'/>
                <h2 className='font-bold'>Kinh doanh</h2>
                <p>12.800 việc làm</p>
            </li>
            <li className='w-[250px] h-[250px]  bg-red-500 rounded-lg flex flex-col items-center justify-center item-major'>
                <Image src={'/majors/iconBusiness.svg'} className='w-32' width={200} height={200} alt='Kinh doanh'/>
                <h2 className='font-bold'>Kinh doanh</h2>
                <p>12.800 việc làm</p>
            </li>
            <li className='w-[250px] h-[250px]  bg-red-500 rounded-lg flex flex-col items-center justify-center item-major'>
                <Image src={'/majors/iconBusiness.svg'} className='w-32' width={200} height={200} alt='Kinh doanh'/>
                <h2 className='font-bold'>Kinh doanh</h2>
                <p>12.800 việc làm</p>
            </li>
            <li className='w-[250px] h-[250px]  bg-red-500 rounded-lg flex flex-col items-center justify-center item-major'>
                <Image src={'/majors/iconBusiness.svg'} className='w-32' width={200} height={200} alt='Kinh doanh'/>
                <h2 className='font-bold'>Kinh doanh</h2>
                <p>12.800 việc làm</p>
            </li>
            <li className='w-[250px] h-[250px]  bg-red-500 rounded-lg flex flex-col items-center justify-center item-major'>
                <Image src={'/majors/iconBusiness.svg'} className='w-32' width={200} height={200} alt='Kinh doanh'/>
                <h2 className='font-bold'>Kinh doanh</h2>
                <p>12.800 việc làm</p>
            </li>
            <li className='w-[250px] h-[250px]  bg-red-500 rounded-lg flex flex-col items-center justify-center item-major'>
                <Image src={'/majors/iconBusiness.svg'} className='w-32' width={200} height={200} alt='Kinh doanh'/>
                <h2 className='font-bold'>Kinh doanh</h2>
                <p>12.800 việc làm</p>
            </li>
        </ul>
    </div>
    </div>
    
  )
}

export default TopMajorComponent