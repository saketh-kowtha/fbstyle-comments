import React, { useEffect, useState } from "react";
import { Label } from "../../lib";
import { formatDate } from "../../utils";

export default function RepliedOn({ ts }) {
  const [formattedDate, setFormattedDate] = useState();

  useEffect(() => {
    setFormattedDate(formatDate(ts));

    const idx = setInterval(() => {
      setFormattedDate(formatDate(ts));
    }, 1000);

    return () => clearInterval(idx);
  }, [ts]);

  return <Label>{formattedDate}</Label>;
}
