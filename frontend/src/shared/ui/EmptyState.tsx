interface Props {
  message: string;
}

export function EmptyState({ message }: Props) {
  return (
    <div className="flex items-center justify-center h-24 text-white/30 text-sm font-medium">
      {message}
    </div>
  );
}