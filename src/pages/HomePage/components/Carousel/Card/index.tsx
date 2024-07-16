import { FC } from "react";
import { Link } from "@tanstack/react-router";

import fallbackImage from "/cocktails.jpg";

import "./style.css";
import { Avatar, Skeleton } from "@radix-ui/themes";

type CarouselCardProps = {
  id: string;
  title: string;
  imageUrl: string;
};

const CarouselCard: FC<CarouselCardProps> = ({ imageUrl, title, id }) => {
  return (
    <Link to={`/cocktail/${id}`} key={id} className="carousel-card">
      <Avatar
        fallback={<Skeleton />}
        src={imageUrl || fallbackImage}
        alt={title}
        className="carousel-card__image"
      />
      <h3 className="carousel-card__title">{title}</h3>
    </Link>
  );
};

export default CarouselCard;
