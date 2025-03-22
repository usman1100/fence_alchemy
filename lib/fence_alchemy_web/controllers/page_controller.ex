defmodule FenceAlchemyWeb.PageController do
  use FenceAlchemyWeb, :controller

  def home(conn, _params) do
    zoom = 5
    conn |> put_layout(html: :app) |> render(:home, zoom: zoom)
  end
end
