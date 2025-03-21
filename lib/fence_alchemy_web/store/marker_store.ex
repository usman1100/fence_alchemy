defmodule FenceAlchemyWeb.Marker do
  @derive {Jason.Encoder, only: [:id, :lng, :lat]}
  @enforce_keys [:id, :lng, :lat]
  defstruct [:id, :lng, :lat]

  @type t :: %__MODULE__{
          id: integer(),
          lng: float(),
          lat: float()
        }
end

defmodule FenceAlchemyWeb.Store.MarkerStore do
  use Agent

  def start_link(initial) do
    Agent.start_link(fn -> initial end, name: __MODULE__)
  end

  def add(marker) do
    Agent.update(__MODULE__, fn markers -> [marker | markers] end)
  end

  def get_all do
    Agent.get(__MODULE__, fn markers -> markers end)
  end
end
