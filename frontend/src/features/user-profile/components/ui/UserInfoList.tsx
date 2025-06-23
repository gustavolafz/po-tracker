import type { PropsUserInfoList } from "../../types";

export const UserInfoList = ({ user }: PropsUserInfoList) => {
  const info = [
    ["Nome", user.name],
    ["Email", user.email],
    ["Tipo de usuário", user.type],
    ["Setor", user.setor],
    ["ID de Registro", user.registro],
  ];

  return (
    <div className="space-y-4 text-sm text-muted-foreground">
      {info.map(([label, value]) => (
        <div key={label} className="flex justify-between">
          <span className="font-medium">{label}:</span>
          <span className="text-foreground capitalize">{value}</span>
        </div>
      ))}
    </div>
  );
};
