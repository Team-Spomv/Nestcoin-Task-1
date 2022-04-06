import { PageHeader } from "antd";

// displays a page header

export default function Header() {
  return (
      <PageHeader
        title="NestCoin"
        subTitle="forkable Ethereum dev stack focused on fast product iteration"
        style={{ cursor: "pointer" }}
      />
  );
}