import { SVGProps } from 'react'

export const Squere = (props: SVGProps<SVGSVGElement>) => (
<svg 
width="24" 
height="24" 
viewBox="0 0 24 24" 
fill="none" 
xmlns="http://www.w3.org/2000/svg"
{...props}>
<rect x="5.75" y="5.75" width="12.5" height="12.5" rx="3.25" stroke="#353535" strokeWidth="1.5" strokeLinejoin="round"/>
</svg>
)