defmodule FenceAlchemyWeb.PageController do
  use FenceAlchemyWeb, :controller
  import FenceAlchemyWeb.UserAuth

  def home(conn, params) do
    conn
    |> redirect_if_user_is_authenticated(params)
    |> put_layout(false)
    |> render(:home)
  end

  def map(conn, params) do
    conn
    |> require_authenticated_user(params)
    |> put_layout(html: :app)
    |> render(:map)
  end
end
