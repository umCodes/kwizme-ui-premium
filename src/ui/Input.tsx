import type { JSX} from "react";

type Props = {
    label: string;
} & JSX.IntrinsicElements['input'];

const Input = ({label, ...rest}: Props) => {
  return (
    <div className="w-80 m-2 flex flex-col gap-1">
    <label className="text-sm text-zinc-600 font-semibold">{label}</label>
        <input 
            className="border border-gray-300 px-4 py-2 rounded-xl bg-zinc-50 text-gray-700
           shadow-[inset_2px_2px_4px_rgba(255,255,255,0.7),inset_-1px_-1px_2px_rgba(0,0,0,0.05)]
           focus:outline-none focus:shadow-[2px_2px_4px_rgba(255,255,255,0.8),-1px_-1px_2px_rgba(0,0,0,0.05)]"
            {...rest}
        />
    </div>
  )
}

export default Input