'use client';
import React, { useEffect } from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Image from "next/image";
import { Star, ThumbsDown, ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/ui/sidebar"
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { getOrganizationPokemons, toggleLike } from "@/store/slice/pokemon";
import { Button } from "@/components/ui/button";

export default function Pokemons() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { toast } = useToast();
  const loading = useAppSelector((state) => state.pokemon.loading);
  const pokemons: any = useAppSelector((state) => state.pokemon.pokemons);
  const user: any = useAppSelector((state) => state.auth.user);
  const totalPages = useAppSelector((state: any) => state.pokemon?.pokemonsMeta?.totalPages);
  const [currentPage, setCurrentPage] = React.useState(1);
  const ITEMS_PER_PAGE = 7;

  useEffect(() => {
    if (user && user.organizationId) {
      const query: any = {
        organizationId: user.organizationId,
        page: currentPage,
        limit: ITEMS_PER_PAGE
      }
      dispatch(getOrganizationPokemons(query));
    }
  }, [currentPage, user, dispatch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const likeDislike = (pokemon: any, status: boolean) => {
    const currentStatus = checkLikeStatus(pokemon.favorites);
    const payload = {
      liked: status,
      pokemonId: pokemon.id,
      userId: user.id
    }
    const query: any = {
      organizationId: user.organizationId,
      page: currentPage,
      limit: ITEMS_PER_PAGE
    }

    if ((currentStatus === 'liked' && status === true) || (currentStatus === 'disliked' && status === false)) {
      if (confirm("Are you sure you want to remove your rating?")) {
        dispatch(toggleLike(payload))
          .unwrap()
          .then((res: any) => {
            dispatch(getOrganizationPokemons(query));
            toast({
              title: 'Rating removed',
            });
          })
          .catch((error: any) => {
            console.log("like/dislike removal failed:", error);
            toast({
              title: error.message || 'Error occurred',
              description: 'Please try later',
            });
          });
      }
    } else {
      dispatch(toggleLike(payload))
        .unwrap()
        .then((res: any) => {
          dispatch(getOrganizationPokemons(query));
          toast({
            title: res.message || 'Success',
          });
        })
        .catch((error: any) => {
          console.log("like/dislike failed:", error);
          toast({
            title: error.message || 'Error occurred',
            description: 'Please try later',
          });
        });
    }
  };

  const checkLikeStatus = (favorites: any[]) => {
    if (favorites && favorites.length > 0) {
      for (const el of favorites) {
        if (user.id == el.userId) {
          return el.liked ? 'liked' : 'disliked';
        }
      }
    }
    return false;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="w-full">
        <div className="h-full flex flex-col mt-[8%] items-center">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semium tracking-tight">Pokemon club!</h2>
            <p className="text-muted-foreground">Here's a list of pokemons for this organization!</p>
          </div>
          <div className="w-full lg:w-[70%]">
            <div className="rounded border">
              {pokemons && pokemons.length > 0 &&
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">P-id</TableHead>
                      <TableHead>Sprite</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Species</TableHead>
                      <TableHead>Weight</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pokemons.map((pokemon: any, index: number) => {
                      const image = pokemon.sprites["front_default"] || pokemon.sprites["back_default"]
                      return (
                        <TableRow key={index}>
                          <TableCell className="text-light">PKN-{pokemon.id}</TableCell>
                          <TableCell className="text-light">
                            {image ?
                              <Image
                                src={image}
                                alt={pokemon.name}
                                width={40}
                                height={40}
                              />
                              : <Star size={40} />
                            }
                          </TableCell>
                          <TableCell className="font-medium capitalize">{pokemon?.name}</TableCell>
                          <TableCell className="">{pokemon?.species?.name || 'Unknown'}</TableCell>
                          <TableCell>{pokemon.weight}g</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              onClick={() => likeDislike(pokemon, true)}
                            >
                              <ThumbsUp
                                size={18}
                                className={checkLikeStatus(pokemon.favorites) === 'liked' ? 'text-teal-500' : ''}
                              />
                            </Button>
                            <Button
                              variant="ghost"
                              onClick={() => likeDislike(pokemon, false)}
                            >
                              <ThumbsDown
                                size={18}
                                className={checkLikeStatus(pokemon.favorites) === 'disliked' ? 'text-red-500' : ''}
                              />
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              }
            </div>
            <div className="flex flex-col items-end my-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    // disabled={currentPage === 1 ? true : false}
                    />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        onClick={() => handlePageChange(index + 1)}
                        isActive={currentPage === index + 1}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    // disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}