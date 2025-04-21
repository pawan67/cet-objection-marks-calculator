export function UserInfo({ name }: { name: string }) {
  return (
    <div className="mt-3">
      <h3 className="font-semibold">Showing Data For:</h3>
      <p>{name}</p>
    </div>
  );
}

export default UserInfo;
