using Systen.Collections.Generic;

public class ChessGameService
{
    public string [,] Board {get; private set;}
    public List<string> PlayerChat {get; private set; } = new List<string>();
    public List<string> SpectatorChat { get; private set; } = new List<string>();

}