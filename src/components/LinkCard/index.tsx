import { BASE_URL } from "../constants/base-url";
import { AnchorHTMLAttributes, useEffect, useState } from "react";

type LinkCardProps = {
  /**  */
  url: `http${string}`;
  /**  */
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  /**  */
  render: (props: { title?: string; description?: string; ogp?: string; favicon?: string; url?: string; error?: boolean; loading?: boolean }) => JSX.Element;
};

type FetchData = {
  /**  */
  title: string;
  /**  */
  description: string;
  /**  */
  ogp: string;
  /**  */
  favicon: string;
};

const LinkCard: React.FC<LinkCardProps> = ({ url, render }) => {
  // const [fetchData, setFetchData] = useState<FetchData | null>(null);
  // const [error, setError] = useState<boolean>(false);
  // const [loading, setLoading] = useState<boolean>(false);

  const [fetchState, setFetchState] = useState<{ data: FetchData | null; error: boolean; loading: boolean }>({
    data: null,
    error: false,
    loading: false,
  });

  useEffect(() => {
    (async () => {
      setFetchState({ data: null, error: false, loading: true });
      try {
        const res = await fetch(encodeURI(BASE_URL + url));
        const data = await res.json();
        setFetchState({ data, error: false, loading: false });
      } catch (err) {
        setFetchState({ data: null, error: true, loading: false });
      }
    })();
  }, [url]);

  const { data: fetchData, error, loading } = fetchState;

  return render({ title: fetchData?.title, description: fetchData?.description, ogp: fetchData?.ogp, favicon: fetchData?.favicon, error, loading, url });
};

export default LinkCard;
