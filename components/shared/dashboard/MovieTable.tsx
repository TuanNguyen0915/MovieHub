import { Popover } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { useUserStore } from "@/lib/stores/user.store"
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Film, MoreHorizontal, XCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import DashBoardAction from "./DashBoardAction"

interface IProps {
  movies: { id: number; name: string; image: string }[]
  type: string
}
const MovieTable = ({ movies, type }: IProps) => {
  return (
    <Table>
      <TableBody>
        {movies.map((movie) => (
          <TableRow key={movie.id}>
            <TableCell>
              <div>
                <Link
                  href={`/${type}/${movie.id}`}
                  className="flexCol group gap-2"
                >
                  <Image
                    width={200}
                    height={200}
                    src={movie.image}
                    alt="movie"
                    className="rounded-xl opacity-80 transition-all group-hover:opacity-100"
                  />
                  <p className="text-lg capitalize text-muted-foreground transition-all group-hover:text-primary max-lg:text-base">
                    {movie.name}
                  </p>
                </Link>
              </div>
            </TableCell>
            <TableCell className="flexCenter text-right">
              <DashBoardAction type={type} movieId={movie.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default MovieTable
