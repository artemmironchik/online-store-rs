import { FC, useState } from "react";

const CopyLink: FC = () => {
  const [link, setLink] = useState<string>('')
  const [text, setText] = useState<string>('Copy Link')

  const handleClick = () => {
    setLink(window.location.href)
    navigator.clipboard.writeText(link)
    setText('Copied!')
    setTimeout(() => {
      setText('Copy Link')
    }, 1000)
  }

  return (
    <button
      className='cursor-pointer border border-solid p-x-5 p-y-27'
      onClick={handleClick}
    >
    {text}
    </button>
  )
}

export default CopyLink