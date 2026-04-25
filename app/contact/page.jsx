'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectLabel, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import emailjs from '@emailjs/browser'
import { useMemo, useState } from 'react'

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"

const info = [
  {
    icon: <FaPhoneAlt />,
    title: 'Phone',
    decription: '(+234) 810 656 4010'
  },
  {
    icon: <FaEnvelope />,
    title: 'Email',
    decription: 'ismailonibiz@gmail.com'
  },
  {
    icon: <FaMapMarkerAlt />,
    title: 'Address',
    decription: '17, Alubarika street, Bariga, Lagos, Nigeria.'
  }
]

import { motion } from "framer-motion"

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  service: '',
  message: '',
}

const Contact = () => {
  const [formData, setFormData] = useState(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', message: '' })

  const emailjsConfig = useMemo(
    () => ({
      serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    }),
    []
  )

  const handleInputChange = (field) => (event) => {
    setFormData((current) => ({
      ...current,
      [field]: event.target.value,
    }))
  }

  const handleServiceChange = (value) => {
    setFormData((current) => ({
      ...current,
      service: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.firstName || !formData.email || !formData.service || !formData.message) {
      setFeedback({
        type: 'error',
        message: 'Please fill in your first name, email, service, and message.',
      })
      return
    }

    if (!emailjsConfig.serviceId || !emailjsConfig.templateId || !emailjsConfig.publicKey) {
      setFeedback({
        type: 'error',
        message: 'Email service is not configured yet. Add your EmailJS environment variables.',
      })
      return
    }

    setIsSubmitting(true)
    setFeedback({ type: '', message: '' })

    try {
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: `${formData.firstName} ${formData.lastName}`.trim(),
          from_email: formData.email,
          phone_number: formData.phone,
          selected_service: formData.service,
          message: formData.message,
        },
        {
          publicKey: emailjsConfig.publicKey,
        }
      )

      setFeedback({
        type: 'success',
        message: 'Message sent successfully. I will get back to you soon.',
      })
      setFormData(initialFormData)
    } catch (error) {
      setFeedback({
        type: 'error',
        message: 'Unable to send your message right now. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.section  
      initial={{opacity: 0}} 
      animate={{opacity: 1, transition: {duration: 0.4, ease: 'easeIn'}}}
      className="section-wrap py-12 md:py-16"
    >
      <div>
        <div className='mb-10'>
          <h2 className='section-title'>Contact</h2>
          <p className='section-subtitle mt-3'>Tell me about your project goals and timeline. I usually reply within 24 hours.</p>
        </div>

        <div className="flex flex-col gap-8 xl:flex-row xl:gap-10">
          {/* form  */}
          <div className="order-2 xl:order-none xl:flex-1">
            <form className="glass-card flex flex-col gap-6 p-6 md:p-8" onSubmit={handleSubmit}>
              <h3 className="text-3xl font-bold text-accent">Let&#39;s work together</h3> 
              <p className="text-sm text-white/70">Need a reliable frontend partner for your startup, product, or redesign? Share the details below.</p>

              {/* input  */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input type='text' placeholder='Firstname' value={formData.firstName} onChange={handleInputChange('firstName')} />
                <Input type='text' placeholder='Lastname' value={formData.lastName} onChange={handleInputChange('lastName')} />
                <Input type='email' placeholder='E-mail address' value={formData.email} onChange={handleInputChange('email')} />
                <Input type='tel' placeholder='Phone number' value={formData.phone} onChange={handleInputChange('phone')} />
              </div>
              {/* select  */}
              <Select value={formData.service} onValueChange={handleServiceChange}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select a service'/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a service</SelectLabel>
                    <SelectItem value='Web Development'>Web Development</SelectItem>
                    <SelectItem value='Web Hosting'>Web Hosting</SelectItem>
                    <SelectItem value='Logo Design'>Logo Design</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* textarea  */}
              <Textarea
                className='h-[200px]'
                placeholder='Type your message here..'
                value={formData.message}
                onChange={handleInputChange('message')}
              />

              {feedback.message && (
                <p className={`text-sm ${feedback.type === 'success' ? 'text-accent' : 'text-red-400'}`}>
                  {feedback.message}
                </p>
              )}

              {/* btn  */}
              <Button size='md' className='max-w-44' type='submit' disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send message'}
              </Button>
            </form>
          </div>
          {/* info */}
          <div className="order-1 mb-8 flex xl:order-none xl:mb-0 xl:w-[36%] xl:justify-end">
            <ul className="flex w-full flex-col gap-4">
              {info.map((item, i) => {
                return (
                  <li key={i} className="glass-card flex items-center gap-5 p-4">
                    <div className="flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-accent/15 text-accent xl:h-[56px] xl:w-[56px]">
                      <div className="text-[22px]">{item.icon}</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white/60">{item.title}</p>
                      <h3 className="text-base leading-snug">{item.decription}</h3>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Contact