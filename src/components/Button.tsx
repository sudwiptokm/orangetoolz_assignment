type Props = {
  title: string;
  onClick: () => void;
};

export const Button = ({ title, onClick }: Props) => {
  return (
    <div
      className="rounded-md bg-white opacity-60 px-4 py-1 hover:opacity-75 cursor-pointer"
      onClick={onClick}
    >
      {title}
    </div>
  );
};
