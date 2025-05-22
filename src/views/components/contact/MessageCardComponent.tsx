import React, { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import type { AppDispatch, RootState } from '../../../model/store';

import { sendEmail } from '../../../controllers/contactSlice';
import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '../../../controllers/messageSlice';

interface MessageCardComponentProps {
  page: string;
}

export const MessageCardComponent: React.FC<MessageCardComponentProps> = ({ page }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [subject, setSubject] = useState<string>();
  const [msg, setMsg] = useState<string>();


  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    try {
      const target = e.target as HTMLInputElement;

      const { name, value } = target;

      if (name === 'first_name') { setFirstName(value); }

      if (name === 'last_name') { setLastName(value); }

      if (name === 'email') { setEmail(value); }

      if (name === 'subject') { setSubject(value) }

      if (name === 'msg') { setMsg(value) }

    } catch (error) {
      const err = error as Error;
      dispatch(setMessage(err.message));
      dispatch(setMessageType('error'));
    }
  };

  const handleSubmit = async () => {
    const form = document.getElementById('message_card') as HTMLFormElement;
    const formData = new FormData(form);

    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    dispatch(sendEmail(data));
  };

  return (
    <>
      <form className="message-card" id='message_card'>
        <table>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="first_name"
                  className="input"
                  id="first_name"
                  placeholder="First Name"
                  onChange={handleInputChange}
                  value={firstName}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="last_name"
                  className="input"
                  id="last_name"
                  placeholder="Last Name"
                  onChange={handleInputChange}
                  value={lastName}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  name="email"
                  type="email"
                  id="contact_email"
                  className="input"
                  placeholder="Email"
                  onChange={handleInputChange}
                  value={email}
                />
              </td>
              <td>
                <input
                  name="subject"
                  type="text"
                  id="contact_subject"
                  className="input"
                  placeholder="Subject"
                  onChange={handleInputChange}
                  value={subject}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <textarea
                  name="msg"
                  id="contact_message"
                  placeholder="Message"
                  onChange={handleInputChange}
                  value={msg}></textarea>
              </td>
            </tr>
          </tbody>
        </table>

        <input type="hidden" name="action" value="thfw_email_contact" />
        <button
          className="sendmsg"
          id="contact_submit"
          name="submit"
          type="button"
          value="submit"
          onClick={handleSubmit}>
          <h3>SEND</h3>
        </button>
      </form>
    </>
  );
}