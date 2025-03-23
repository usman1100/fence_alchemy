defmodule FenceAlchemyWeb.Live.Counter do
  use Phoenix.LiveView

  def render(assigns) do
    ~H"""
    <button phx-click="increment">
      {@count}
    </button>
    """
  end

  def mount(_params, _session, socket) do
    {:ok, assign(socket, count: 0)}
  end

  def handle_event("increment", _value, socket) do
    {:noreply, assign(socket, count: socket.assigns.count + 1)}
  end
end
