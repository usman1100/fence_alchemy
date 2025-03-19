defmodule FenceAlchemy.Repo do
  use Ecto.Repo,
    otp_app: :fence_alchemy,
    adapter: Ecto.Adapters.Postgres
end
