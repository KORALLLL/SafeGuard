import { SVGProps } from 'react'

interface FaceProps extends SVGProps<SVGSVGElement> {
    strokeColor?: string; 
  }

export const Face = ({strokeColor='#353535', ...props}: FaceProps) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path d="M8.5 15.7409C8.5 14.7575 9.20862 13.9198 10.1717 13.7648C11.3829 13.5699 12.6171 13.5699 13.8283 13.7648C14.7914 13.9198 15.5 14.7575 15.5 15.7409V15.9586C15.5 16.5338 15.0376 17 14.4673 17H9.53269C8.96235 17 8.5 16.5338 8.5 15.9586V15.7409Z" stroke={strokeColor} strokeWidth="1.5"/>
    <path d="M14.0417 9.05882C14.0417 10.1959 13.1276 11.1176 12 11.1176C10.8724 11.1176 9.95833 10.1959 9.95833 9.05882C9.95833 7.92177 10.8724 7 12 7C13.1276 7 14.0417 7.92177 14.0417 9.05882Z" stroke={strokeColor} strokeWidth="1.5"/>
    <path d="M21 7C21 4.79086 18.7614 3 16 3M3 16C3 18.7614 4.79086 21 7 21M7 3C4.79086 3 3 4.79086 3 7M16 21C18.7614 21 21 18.7614 21 16" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
)