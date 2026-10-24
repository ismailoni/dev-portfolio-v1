'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectLabel, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import emailjs from '@emailjs/browser'
import { useMemo, useState } from 'react'
import { contactInfo } from '@/lib/data'

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"

const icons = [<FaPhoneAlt key='p' />, <FaEnvelope key='e' />, <FaMapMarkerAlt key='a' />]
const info = contactInfo.map((item, i) => ({ ...item, icon: icons[i] }))

import { AnimatePresence, motion } from "framer-motion"

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
  const [errorMessage, setErrorMessage] = useState('')
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

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
      setErrorMessage('Please fill in your first name, email, service, and message.')
      return
    }

    if (!emailjsConfig.serviceId || !emailjsConfig.templateId || !emailjsConfig.publicKey) {
      setErrorMessage('Email service is not configured yet. Add your EmailJS environment variables.')
      return
    }

    setIsSubmitting(true)
    setErrorMessage('')

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

      setIsSuccessModalOpen(true)
      setFormData(initialFormData)
    } catch (error) {
      setErrorMessage('Unable to send your message right now. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 2.05, duration: 0.75, ease: 'easeOut' } }}
      className="section-wrap pb-20 pt-[40vh] xl:pb-12 xl:pt-10"
    >
      {/* The 3D beacon (components/three/ContactStation.jsx) shows through the open area on the left / top. */}
      <div className="grid gap-8 xl:min-h-[calc(100vh-11rem)] xl:grid-cols-[0.85fr_1.15fr] xl:gap-14">
        {/* info */}
        <div className="order-2 flex flex-col justify-center xl:order-1 xl:pb-14">
          <ul className="flex w-full flex-col gap-3 xl:max-w-[440px]">
            {info.map((item, i) => {
              const content = (
                <>
                  <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <div className="text-[20px]">{item.icon}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/60">{item.title}</p>
                    <h3 className="break-words text-base leading-snug">{item.value}</h3>
                  </div>
                </>
              )
              return (
                <li key={i} className="pointer-events-auto">
                  {item.href ? (
                    <a href={item.href} className="glass-card flex items-center gap-5 p-4 transition-colors hover:border-accent/50">
                      {content}
                    </a>
                  ) : (
                    <div className="glass-card flex items-center gap-5 p-4">{content}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        {/* title + form */}
        <div className="order-1 xl:order-2 flex flex-col justify-center">
          <div className="pointer-events-auto mb-6">
            <h2 className='section-title'>Contact</h2>
            <p className='section-subtitle mt-3'>Tell me about your project goals and timeline. I usually reply within 24 hours.</p>
          </div>

          <form className="glass-card pointer-events-auto flex flex-col gap-6 bg-[#0b1020]/70 p-6 md:p-8" onSubmit={handleSubmit}>
            <h3 className="text-3xl font-bold text-accent">Let&#39;s work together</h3>
            <p className="text-sm text-white/70">Need a reliable frontend partner for your startup, product, or redesign? Share the details below.</p>

            {/* input  */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
              className='h-[160px]'
              placeholder='Type your message here..'
              value={formData.message}
              onChange={handleInputChange('message')}
            />

            {errorMessage && <p className='text-sm text-red-400'>{errorMessage}</p>}

            {/* btn  */}
            <Button size='md' className='max-w-44' type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send message'}
            </Button>
          </form>
        </div>
      </div>

      <AnimatePresence>
        {isSuccessModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='pointer-events-auto fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm'
            onClick={() => setIsSuccessModalOpen(false)}
            role='dialog'
            aria-modal='true'
            aria-label='Message sent successfully'
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
              className='glass-card w-full max-w-md p-6 md:p-7'
            >
              <p className='text-xs uppercase tracking-[0.2em] text-accent'>Submitted</p>
              <h3 className='mt-2 text-2xl font-bold text-white'>Message sent successfully</h3>
              <p className='mt-3 text-sm text-white/70'>Thanks for reaching out. I&apos;ll get back to you shortly.</p>

              <div className='mt-6 flex justify-end'>
                <Button
                  type='button'
                  size='md'
                  className='max-w-32'
                  onClick={() => setIsSuccessModalOpen(false)}
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

export default Contact
