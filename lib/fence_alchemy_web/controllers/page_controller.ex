defmodule FenceAlchemyWeb.PageController do
  use FenceAlchemyWeb, :controller

  def home(conn, _params) do
    conn
    |> put_layout(false)
    |> render(:home)
  end

  def map(conn, _params) do
    conn |> put_layout(html: :app) |>render(:map)
  end
end
