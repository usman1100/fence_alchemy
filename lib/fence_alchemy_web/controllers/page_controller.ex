defmodule FenceAlchemyWeb.PageController do
  use FenceAlchemyWeb, :controller

  def home(conn, _params) do
    conn |> put_layout(html: :page) |> render(:home)
  end
end
