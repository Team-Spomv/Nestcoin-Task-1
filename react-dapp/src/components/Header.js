import { PageHeader } from "antd";

// displays a page header

export default function Header() {
  return (
      <PageHeader
        title="NestCoin"
        subTitle="Nestcoin the future of film house."
        style={{ cursor: "pointer" }}
      />
  );
}