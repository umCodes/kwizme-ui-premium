type Props = {
    text: string;
}
const Button = ({text, ...rest}: Props) => {
  return (
    <button
        {...rest}
    >
        {text}
    </button>
  )
}

export default Button