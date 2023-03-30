X = 0 -- is the forward direction from the start
Y = 0 -- y is the height
Z = 0 -- is the right direction from the start

LastY = settings.get("lastY")
LastRow = 0
Fuel = true
Failed = false
Rotation = 0 -- 0 forwards of start, each positive is 90 degrees to the right
Depth = settings.get("depth")
Size = settings.get("size")
CorF = ((Size + 1) % 2) * Size
RowFails = 0
MaxRowFail = Size * 4

print("CorF: " .. CorF)
print("Depth: " .. Depth)
print("Size: " .. Size)


function MineThreeBlocks()
    for i = 0, 2, 1 do
        turtle.dig()
        if turtle.forward() then
            IncrementDirection()
            turtle.digUp()
            turtle.digDown()
            return true
        end
        RowFails = RowFails + 1
        return false
    end
end

function Forward()
    if turtle.forward() then
        IncrementDirection()
        return true
    end
    return false
end

function Backward()
    if turtle.back() then
        DecrementDirection()
        return true
    end
    return false
end

function Up()
    if turtle.up() then
        Y = Y + 1
        return true
    end
    return false
end

function Down()
    if turtle.down() then
        Y = Y - 1
        return true
    end
    return false
end

function ReturnToHome()
    if Rotation % 4 == 2 then
        Left()
        Forward()
        Left()
        return ReturnToHome()
    end

    ResetRotation()

    if (X == 0 and Y == 0 and Z == 0) then
        return
    end


    while X ~= 0 do
        if (X > 0) then
            if not Backward() then
                break
            end
        end
    end


    Right()
    while Z ~= 0 do
        if (Z > 0) then
            if not Backward() then
                break
            end
        else
            if not Forward() then
                break
            end
        end
    end

    Left()

    while Y ~= 0 do
        if (Y > 0) then
            if not Down() then
                break
            end
        else
            if not Up() then
                break
            end
        end
    end

    ReturnToHome()
end

function ScanInventory()
    if turtle.getFuelLevel() < Depth * 2 + Size * 5 then
        Fuel = false
        return true
    end


    local emptySlots = 16
    for i = 1, 16, 1 do
        if turtle.getItemCount(i) > 0 then
            emptySlots = emptySlots - 1
        end
    end
    if emptySlots == 0 then
        turtle.select(1)
        return true
    end
    return false
end

function IncrementDirection()
    X = X + math.floor(math.cos(Rotation * math.pi / 2) + 0.5)
    Z = Z + math.floor(math.sin(Rotation * math.pi / 2) + 0.5)
end

function DecrementDirection()
    X = X - math.floor(math.cos(Rotation * math.pi / 2) + 0.5)
    Z = Z - math.floor(math.sin(Rotation * math.pi / 2) + 0.5)
end

--? Update to go to last Rot = 0 row
function ReturnToDepth()
    Orient()
    while (LastY < Y) do
        turtle.digDown()
        if not turtle.down() then
            print("failed in Forwards block")
            ReturnToHome()
            return false
        end
        Y = Y - 1
    end
    Left()
    for i = 0, LastRow - 1, 1 do
        if not MineThreeBlocks() then
            print("failed in left block")
            ReturnToHome()
            return false
        end
    end
    print("LastRow: " .. LastRow)
    print("x" .. X .. " y" .. Y .. " z" .. Z)
    Right()
    return true
end

function ReturnToRow()

end

function DropItems()
    turtle.turnRight()
    turtle.turnRight()
    for i = 1, 16, 1 do
        turtle.select(i)
        turtle.drop()
    end
    turtle.turnRight()
    turtle.turnRight()
    turtle.select(1)
end

function Left()
    turtle.turnLeft()
    Rotation = Rotation - 1
end

function Right()
    turtle.turnRight()
    Rotation = Rotation + 1
end

function Mine()
    RowFails = 0
    local state = 3
    if (not Fuel) then
        --TODO add fuel
        ReturnToHome()
        DropItems()
        return
    end


    --Dig one row forwards fully and then mine once to the left and reverse

    while X < Size do
        if RowFails > MaxRowFail then
            Failed = true
            return
        end
        MineThreeBlocks()
        if ScanInventory() then
            ReturnToHome()
            DropItems()
            if not ReturnToDepth() then
                Failed = true
            end
            Mine()
            return
        end
    end

    state = CheckIfFinalCorner()
    if state == -1 then
        Failed = true
        return
    elseif state == 2 then
        return
    end

    Left()
    MineThreeBlocks()
    Left()

    --print("x: " .. X .. " y: " .. Y .. " z: " .. Z)
    while X > 0 do
        if RowFails > MaxRowFail then
            Failed = true
            return
        end
        MineThreeBlocks()
        if ScanInventory() then
            ReturnToHome()
            DropItems()

            if not ReturnToDepth() then
                Failed = true
            end
            Mine()
            return
        end
    end


    state = CheckIfFinalCorner()
    if state == -1 then
        Failed = true
        return
    elseif state == 2 then
        return
    end
    Right()
    MineThreeBlocks()
    Right()
    LastRow = LastRow + 2

    Mine()
end

function ResetRotation()
    while Rotation ~= 0 do
        if (Rotation < 0) then
            Right()
        else
            Left()
        end
    end
end

function CheckIfFinalCorner()
    --? returns 2 if it's the last corner to mine
    LastY = Y
    if Z == 0 and X == CorF then
        ResetRotation()
        Orient()
        return 2
    end
    return 0
end

function Orient()
    --orient the turtle facing forwards in the close right corner of the hole to be dug
    if X == 0 and Z == Size then
        return
    end

    ResetRotation()


    Right()
    while Z ~= Size do
        MineThreeBlocks()
    end

    Right()
    while X ~= 0 do
        MineThreeBlocks()
    end

    ResetRotation()
    Orient()
end

Orient()
print("oriented")
ReturnToDepth()
print("returned to depth")
print("x" .. X .. " y" .. Y .. " z" .. Z)
while Y > -Depth do
    print("Y: " .. Y .. " Depth: " .. Depth)
    Orient()
    Mine()
    if Failed then
        break
    end 

    for i = 0, 2, 1 do
        turtle.digDown()
        if not Down() then
            ReturnToHome()
            return -1
        end
    end

    turtle.digDown()

    LastRow = 0
end
ReturnToHome()

print(turtle.getFuelLevel())
