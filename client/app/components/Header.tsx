type Props = {
  children: React.ReactNode;
};

export const Header = ({ children }: Props) => {
  return (
    <header className={'bg-slate-400 px-6 flex justify-between p-6'}>
      {children}
    </header>
  );
};
