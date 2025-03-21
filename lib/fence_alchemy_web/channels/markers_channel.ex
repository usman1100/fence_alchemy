defmodule FenceAlchemyWeb.MarkersChannel do
  alias FenceAlchemyWeb.Store.MarkerStore
  alias FenceAlchemyWeb.Marker
  use FenceAlchemyWeb, :channel

  @impl true
  def join("markers:all", _payload, socket) do
    markers = MarkerStore.get_all()
    {:ok, %{markers: markers}, socket}
  end

  @impl true
  def handle_in("markers:new", payload, socket) do
    new_marker = %Marker{
      id: Enum.random(1000..9999),
      lng: payload["lng"],
      lat: payload["lat"]
    }

    MarkerStore.add(new_marker)

    all_markers = MarkerStore.get_all()

    broadcast(socket, "markers:new", %{markers: all_markers})
    {:noreply, socket}
  end
end
