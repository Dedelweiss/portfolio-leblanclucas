import { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import { useRef } from 'react'
import emailjs from '@emailjs/browser'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useTranslation } from 'react-i18next'

const Contact = () => {
  const { t } = useTranslation()
  const [letterClass, setLetterClass] = useState('text-animate')
  const form = useRef()
  const contactMeArray = t('contact_me').split('')

  useEffect(() => {
    async function changeClass() {
      await setTimeout(() => {
        setLetterClass('text-animate-hover')
      }, 4000)
    }
    changeClass()
  }, [])

  useEffect(() => {
    const response = localStorage.getItem('res')
    if (response === 'success') {
      toast.success('Your message has been sent!', {
        theme: 'colored',
        icon: '✉️',
      })
      localStorage.removeItem('res')
    }
  }, [])

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(
        'service_kyflqxk',
        'template_7odrvlr',
        form.current,
        'gt3Zfth5Wt6lJOCcX'
      )
      .then(
        () => {
          localStorage.setItem('res', 'success')
          window.location.reload(false)
        },
        () => {
          alert('Something went wrong, please try again!')
        }
      )
  }

  return (
    <>
      <div className="container contact-page">
        <div className="container__row">
          <div className="text-zone container__col1">
            <h1>
              <AnimatedLetters
                letterClass={letterClass}
                strArray={contactMeArray}
                idx={15}
              />
            </h1>
            <p>{t('contact_text')}</p>
            <div className="contact-form">
              <form ref={form} onSubmit={sendEmail}>
                <ul>
                  <li className="half">
                    <input
                      placeholder={t('contact_name')}
                      type="text"
                      name="from_name"
                      id="from_name"
                      required
                    />
                  </li>
                  <li className="half">
                    <input
                      placeholder="Email"
                      type="email"
                      name="email"
                      id="email"
                      required
                    />
                  </li>
                  <li>
                    <input
                      placeholder={t('contact_subject')}
                      type="text"
                      name="subject"
                      id="subject"
                      required
                    />
                  </li>
                  <li>
                    <textarea
                      placeholder="Message"
                      name="message"
                      id="message"
                      required
                    ></textarea>
                  </li>
                  <li>
                    <input
                      type="submit"
                      className="flat-button"
                      value={t('contact_send')}
                    />
                  </li>
                </ul>
              </form>
            </div>
          </div>
          <div className="container__col2"></div>
        </div>
      </div>
      <Loader type="line-scale-pulse-out-rapid" />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        style={{ fontSize: '1rem' }}
      />
    </>
  )
}

export default Contact
