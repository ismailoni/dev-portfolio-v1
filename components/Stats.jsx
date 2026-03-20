'use client';

import CountUp from "react-countup";

const stats = [
    {
        num: 4,
        text: 'Years Experience'
    },
    {
        num: 20,
        text: 'Projects Delivered'
    },
    {
        num: 6,
        text: 'Core Technologies'
    },
    {
        num: 400,
        text: 'Code Commits'
    }
]

const Stats = () => {
  return (
    <section className="pb-6 pt-12 md:pt-16">
        <div className="section-wrap">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat, i) => {
                return (
                    <div className="glass-card flex items-center gap-4 px-5 py-4" key={i}>
                        <div className='text-accent'>
                            <CountUp end={stat.num} duration={3} delay={0.3} className="text-3xl font-extrabold md:text-4xl"/>
                            {i !== 2 && <span className="text-4xl font-extrabold xl:text-6xl">+</span>}
                        </div>
                        <p className='text-sm leading-snug text-white/75'>{stat.text}</p>
                    </div>
                )
            })}
            </div>
        </div>
    </section>
  )
}

export default Stats