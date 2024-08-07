'use client';
import * as React from "react"

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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useRouter } from "next/navigation";
import Sidebar from "@/components/ui/sidebar"
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { getOrganizationPokemons } from "@/store/slice/pokemon";
import Image from "next/image";
import { Star } from "lucide-react";

export default function Pokemons() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { toast } = useToast();
  const loading = useAppSelector((state) => state.pokemon.loading);
  const pokemons: any = useAppSelector((state) => state.pokemon.pokemons);
  const totalPages = useAppSelector((state: any) => state.pokemon?.pokemonsMeta?.totalPages);
  const [currentPage, setCurrentPage] = React.useState(1);
  const ITEMS_PER_PAGE = 7;

  React.useEffect(() => {
    const query: any = {
      organizationId: 1,
      page: currentPage,
      limit: ITEMS_PER_PAGE
    }
    dispatch(getOrganizationPokemons(query));
  }, [currentPage, dispatch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="w-full">
        <div className="h-full flex flex-col mt-[8%] items-center">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight">Pokemon club!</h2>
            <p className="text-muted-foreground">Here's a list of your tasks for this month!</p>
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
                      <TableHead className="text-right"></TableHead>
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
                      disabled={currentPage === 1}
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
                      disabled={currentPage === totalPages}
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